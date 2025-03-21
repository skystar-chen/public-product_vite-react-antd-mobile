export interface LoginResultType {
  token: string,
  userinfo: {
    id: number,
    clique_id: number,
    job_id: number,
    project_id: number,
    username: number,
  },
}

export type CommonRequestParams = {
  "project_id": number,
  "project_process_id": number,
  "project_process_node": number,
  "current_store"?: number | null,
}

export type UserList = {label: string, value: number}[];
