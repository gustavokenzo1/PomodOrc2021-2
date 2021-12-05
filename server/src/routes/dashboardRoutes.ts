import { Router } from 'express'
import DashboardController from '../controllers/DashboardController'

const dashboardRoutes = Router()
const dashboardController = new DashboardController()

dashboardRoutes.get('/', (req, res) => {
    dashboardController.showDashboard(req,res)
})

export default dashboardRoutes