import { get } from "../request/hengling";

export const getColumns = get('/?app=vehicle&controller=table&action=getFields')

export const setColumns = get('/?app=vehicle&controller=table&action=setFields')