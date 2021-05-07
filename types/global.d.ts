import type {
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType
} from 'vue'

declare global {
  // vue
  declare type PropType<T> = VuePropType<T>;
  declare interface LinkConfig {
    name: string,
    link?: string,
    icon?: string,
    child?: LinkConfig[],
  }

  interface TreeNode {
    index?: number;
    dateAdded?: number;
    title: string;
    url?: string;
    dateGroupModified?: number;
    id: string;
    parentId?: string;
    children?: TreeNode[];
    unmodifiable?: any;
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new(): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
