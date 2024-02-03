import { TemplateDataType } from "./commonType";

export interface DashboardData {
  category_id: number;
  category_name: string;
  category_thumb: string;
  id_name: string;
  template_model: TemplateDataType[];
}

export interface DashboardDataType {
  datas: DashboardData[];
  isLastPage: boolean;
  success: boolean;
}
