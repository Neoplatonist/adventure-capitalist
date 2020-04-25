import BuildList from '../buildList'
import ListItem from '../listItem'
import { startManager } from './managerListSlice'

const ManagerListBuilder = BuildList(ListItem, startManager)

export default ManagerListBuilder
