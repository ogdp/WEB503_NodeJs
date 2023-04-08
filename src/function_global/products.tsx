export const formatCurrencyVND = (value: number): string =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedDate = `${hours}:${minutes}:${seconds} | ${day}/${month}/${year} `;
  return formattedDate;
}

export const LoaddingRender = (check: boolean) => {
  if (check) {
    const space = document.querySelector(
      "#LoaddingRender #space"
    ) as HTMLElement;
    if (space) {
      space.style.zIndex = "1000";
    }
  } else {
    const space = document.querySelector(
      "#LoaddingRender #space"
    ) as HTMLElement;
    if (space) {
      space.style.zIndex = "-1";
    }
  }
};
