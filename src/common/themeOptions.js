import { useSelector } from "react-redux";
import { COLORS } from "./colors";


export const theme = () => {
    const currentTheme = useSelector(
        state => state.themeReducer.darkTheme
    )
    if (currentTheme) {
        return {
            dark : {
                headerBackgroundColor : '#161a21',

            }
        }
    } else {
        return {
            light : {
                backgroundColor : COLORS.white
            }
        }
    }
}