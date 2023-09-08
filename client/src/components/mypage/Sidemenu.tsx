import { FC } from "react";
import { changeMenu } from "../../redux/menuSlice";
import classes from "./Sidemenu.module.css";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

interface SideMenuProps {
  isAuthor: boolean;
}

const SideMenu: FC<SideMenuProps> = ({ isAuthor }) => {
  const dispatch = useAppDispatch();
  const selectedMenu = useAppSelector((state) => state.menu.selectedMenu);

  return (
    <div className={classes.sidemenuContainer}>
      <div className={classes.profileBox}>
        <div className={classes.profileImg}>{/* 어디서 갖고옴 */}</div>
        <div className={classes.profileInfo}>{/*닉네임 / 이메일*/}</div>
      </div>
      <div className={classes.menuItemsContainer}>
        <ul className={classes.menuItems}>
          <li
            className={`${classes.menuItem} ${
              selectedMenu === "Summary" ? classes.selectedMenuItem : ""
            }`}
            onClick={() => dispatch(changeMenu("Summary"))}
          >
            Summary
          </li>
          <li
            className={`${classes.menuItem} ${
              selectedMenu === "Profile" ? classes.selectedMenuItem : ""
            }`}
            onClick={() => dispatch(changeMenu("Profile"))}
          >
            Profile
          </li>
          <li
            className={`${classes.menuItem} ${
              selectedMenu === "Review" ? classes.selectedMenuItem : ""
            }`}
            onClick={() => dispatch(changeMenu("Review"))}
          >
            Peer Review
          </li>
          {/* {isAuthor && (
            <li
              className={`${classes.menuItem} ${
                selectedMenu === "MyInfo" ? classes.selectedMenuItem : ""
              }`}
              onClick={() => dispatch(changeMenu("MyInfo"))}
            >
              My Info
            </li>
          )} */}
          {/* 회원정보 수정 중 */}
          <li
            className={`${classes.menuItem} ${
              selectedMenu === "MyInfo" ? classes.selectedMenuItem : ""
            }`}
            onClick={() => dispatch(changeMenu("MyInfo"))}
          >
            My Info
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideMenu;
