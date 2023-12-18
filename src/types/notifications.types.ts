export type NotificationType = "default" | "danger" | "warning" | "info" | "success";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timeout: number;
}
