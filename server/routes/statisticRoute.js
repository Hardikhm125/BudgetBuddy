const express = require("express");
const router = express.Router();
const {
    getManagerDashboardController,
    getEmployeeDashboardController,
    getExpenseContibutionController,
    getManagerAnalyticsController,
    getEmployeeAnalyticsController
} = require("../controllers/statisticController");

const {
  managerAuthMiddleware,
  employeeAuthMiddleware,
} = require("../middlewares/authMiddleware");

router.get("/manager-dashboard/:project_id", managerAuthMiddleware, getManagerDashboardController);
router.get("/employee-dashboard/:project_id", employeeAuthMiddleware, getEmployeeDashboardController);
router.get("/expense-contribution/:expense_id", getExpenseContibutionController);
router.get("/manager-analytics/:project_id", managerAuthMiddleware, getManagerAnalyticsController);
router.get("/employee-analytics/:project_id", employeeAuthMiddleware, getEmployeeAnalyticsController);


module.exports = router;