import styles from "./Header.module.css";
import LOGO from "../../imgs/logo.png";

interface Props {
  setCount: any;
}

const Header = ({ setCount }: Props) => {
  function onClick(e: any) {
    const tag = e.currentTarget as HTMLLIElement;
    if(!tag?.parentNode) {
      return;
    }

    (tag.parentNode?.childNodes as unknown as HTMLElement[]).forEach((item ) => {
      if (item.innerText === tag.innerText) {
        item.style.color = "red";
        item.style.textDecoration = "underline";
      } else {
        item.style.color = "black";
        item.style.textDecoration = "none";
      }
    });

    if (tag.innerText === "층별 안내") {
      setCount(2);
    } else {
      setCount(tag.innerText === "메인 페이지" ? 1 : 3);
    }
  }


  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={LOGO} alt="logo" className={styles.logoImg}></img>
      </div>
      <ul className={styles.menu}>
        <li tabIndex={1} className={styles.menuItem} onClick={onClick}>
          메인 페이지
        </li>
        <li tabIndex={2} className={styles.menuItem} onClick={onClick}>
          층별 안내
        </li>
        <li tabIndex={3} className={styles.menuItem} onClick={onClick}>
          오시는길
        </li>
      </ul>
    </div>
  );
};

export default Header;
