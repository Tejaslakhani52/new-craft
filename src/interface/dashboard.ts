import { TemplateDataType } from "./commonType";

export interface DashboardDataType {
  category_id: number;
  category_name: string;
  category_thumb: string;
  id_name: string;
  template_model: TemplateDataType[];
}
