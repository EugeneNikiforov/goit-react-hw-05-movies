import { Audio } from "react-loader-spinner";
import css from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={css.spiner}>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="loading"
      />
    </div>
  );
}