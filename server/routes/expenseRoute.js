const express = require("express");
const router = express.Router();
const {
    addExpenseController,
    updateExpenseController,
    getExpenseEmployeeController,
    getExpenseManagerController,
    deleteExpenseController,
    acceptExpenseController,
    rejectExpenseController,
    getExpenseByIdController,
    getExpenseManagerByFilterController,
    getExpenseEmployeeByFilterController
} = require("../controllers/expenseController");

const { employeeAuthMiddleware, managerAuthMiddleware } = require("../middlewares/authMiddleware");

router.post("/add-expense/:project_id", employeeAuthMiddleware, addExpenseController);
router.patch("/update-expense/:expense_id", employeeAuthMiddleware, updateExpenseController);
router.get("/expenses-employee/:project_id", employeeAuthMiddleware, getExpenseEmployeeController);
router.get("/expenses-manager/:project_id", managerAuthMiddleware, getExpenseManagerController);
router.delete("/delete-expense/:expense_id", employeeAuthMiddleware, deleteExpenseController);
router.patch("/accept-expense/:expense_id", managerAuthMiddleware, acceptExpenseController);
router.patch("/reject-expense/:expense_id", managerAuthMiddleware, rejectExpenseController);
router.get("/expense/:expense_id", getExpenseByIdController)
router.post("/expenses-manager-filter/:project_id", managerAuthMiddleware, getExpenseManagerByFilterController);
router.post("/expenses-employee-filter/:project_id", employeeAuthMiddleware, getExpenseEmployeeByFilterController);

module.exports = router;
