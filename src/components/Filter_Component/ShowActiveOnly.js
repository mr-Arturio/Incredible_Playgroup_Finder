import { useLanguage } from "../../context/LanguageContext";

const ShowActiveOnly = ({
  containerClassName = "",
  checkboxClassName = "",
  labelClassName = "",
  checked = false,
  onChange,
}) => {
  const { translation } = useLanguage();

  return (
    <div className={containerClassName}>
      <input
        type="checkbox"
        id="showActiveOnly"
        className={checkboxClassName}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor="showActiveOnly"
        className={labelClassName}
      >
        {translation === "fr"
          ? "Afficher uniquement les actifs"
          : "Show active only"}
      </label>
    </div>
  );
};

export default ShowActiveOnly;
