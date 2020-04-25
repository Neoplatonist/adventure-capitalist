import BuildList from '../buildList'
import ListItem from '../listItem'
import { unlockUpgradeMultiplierAsync } from './upgradeListSlice'

const UpgradeListBuilder = BuildList(ListItem, unlockUpgradeMultiplierAsync)

export default UpgradeListBuilder
