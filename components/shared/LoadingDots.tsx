import styles from "./loading-dots.module.css";

export const LoadingDots = ({
  variant = "light",
}: {
  variant: "dark" | "light";
}) => {
  let dotColor;
  variant === "light" ? (dotColor = "bg-white") : (dotColor = "bg-gray-500");
  return (
    <span className={styles.loading}>
      <span className={`${dotColor}`} />
      <span className={`${dotColor}`} />
      <span className={`${dotColor}`} />
    </span>
  );
};
