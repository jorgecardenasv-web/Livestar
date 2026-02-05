export const formatDate = (date: Date) => {
  const dateObj = new Date(date);
  
  const formatter = new Intl.DateTimeFormat("es-MX", {
    timeZone: "America/Mexico_City",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  
  const parts = formatter.formatToParts(dateObj);
  const partsMap = parts.reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {} as Record<string, string>);
  
  return `${partsMap.day}/${partsMap.month}/${partsMap.year}, ${partsMap.hour}:${partsMap.minute}:${partsMap.second}`;
};
