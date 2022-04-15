# Practice StoryBook

react v18
Storybook 6.4.22


## 機能
- 作成した UI コンポーネントをカタログのように管理できる。
- コンポーネントのstate変更による変化、データの受け渡しを画面上で確認可能
- ツールバーより PC,SP(small,midium)での画面変化を確認可能。

大きなシステムになるとコンポーネントの把握が難しいので便利そう。





## Command
`test": "react-scripts test`   
`yarn storybook`



## Config 

``` js
//.storybook\main.js
module.exports = {
  //読み込むstoryを指定
  "stories": [
    "../src/components/**/*.stories.mdx", //document
    "../src/components/**/*.stories.js",  //story
  ],
  //アドオン
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  //vue angular Svelte
  framework: "@storybook/react",
  core: {
    "builder": "@storybook/builder-webpack5"
  }
}
```



## Story Make

`**.stories.jsx` ... storybook用ファイル

### 最小コンポーネント
``` js
import React from "react";
import Task from "./Task"; //import component

export default {
  component: Task,   //import component
  title: "Task/Task", //folder/display_name
  argTypes: {}, //属性
};
// Template関数
const Template = (args) => <Task {...args}/>;

// Basic 
export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updatedAt: new Date(2018, 0, 1, 9, 0),
  },
};

// Custom 
export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: "TASK_PINNED",
  },
};

```

### 複合コンポーネント

組み合わせるコンポーネントのストーリーをインポートする


``` js
import TaskList from "./TaskList";
import * as TaskStories from "./Task.stories";

export default {
  component: TaskList,
  title: "Task/TaskList",
  //wrapper dom
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};

const Template = (args) => <TaskList {...args} />;
export const Default = Template.bind({});
Default.args = {
  //初期値を格納
  tasks: [
    { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
    { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
    { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
  ],
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [
    ...Default.args.tasks.slice(0, 5),
    { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
  ],
};

// Loading中
export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

//空の場合
export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};

```




## Document Make

`**.stories.mdx` ... storybook用ファイル


