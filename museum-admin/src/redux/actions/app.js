import { SHOW_DRAWER } from '../constants/app'

export function showDrawer(show) {
    return {
        type: SHOW_DRAWER,
        payload: show
    }
}
