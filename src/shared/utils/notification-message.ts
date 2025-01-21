export interface NotificationMessage {
  [key: string]: string;
}

export const notificationMessages: NotificationMessage = {
  addAdvisor: "¡Asesor creado exitosamente!",
  editAdvisor: "¡Asesor editado exitosamente!",
  deleteAdvisor: "¡Asesor borrado exitosamente!",
  editProspect: "¡Prospecto editado exitosamente!",
  addInsurance: "¡Aseguradora creada exitosamente!",
  error: "Error desconocido.",
  general: "Error al editar al asesor.",
};

export const getNotificationMessage = (type: string) => {
  return notificationMessages[type] ?? "Error desconocido.";
};
