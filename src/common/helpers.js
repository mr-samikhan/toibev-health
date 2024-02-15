import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const useBreakpints = () => {
  const theme = useTheme()
  const mobileMode = useMediaQuery(theme.breakpoints.between(0, 600))
  const tabMode = useMediaQuery(theme.breakpoints.between(600, 900))
  const desktopMode = useMediaQuery(theme.breakpoints.up(900))

  return {
    mobileMode,
    tabMode,
    desktopMode,
  }
}

export const checkForDuplicate = (array, value) => {
  if (
    array?.some((item) => item?.title?.toLowerCase() === value?.toLowerCase())
  ) {
    return false
  } else {
    return true
  }
}
