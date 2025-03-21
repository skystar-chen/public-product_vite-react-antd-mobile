export type IMenusType = {
  schema_code: string,
  icon: string,
  id: number,
  title: string,
  title_en: string,
  children: IMenusType[],
}
