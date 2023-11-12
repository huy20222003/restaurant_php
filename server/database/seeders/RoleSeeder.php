<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = Role::create(['name' => 'user']);
        $employee = Role::create(['name' => 'employee']);
        $admin = Role::create(['name' => 'admin']);

        //account
        $getAccountUser = Permission::create(['name'=> 'get_account_user']);
        $getAccountAdmin = Permission::create(['name'=> 'get_account_admin']);

        //product
        $createProduct = Permission::create(['name'=> 'create_product']);
        $updateProduct = Permission::create(['name'=> 'update_product']);
        $deleteProduct = Permission::create(['name'=> 'delete_product']);

        //cart
        $getCart = Permission::create(['name'=> 'get_cart']);
        $updateCart = Permission::create(['name'=> 'update_cart']);
        $deleteProductFromCart = Permission::create(['name'=> 'delete_product_from_cart']);

        //category
        $createCategory = Permission::create(['name'=> 'create_category']);
        $updateCategory = Permission::create(['name'=> 'update_category']);
        $deleteCategory = Permission::create(['name'=> 'delete_category']);
        $addProductToCategory = Permission::create(['name'=> 'add_product_to_category']);

        //employee
        $showAllEmployees = Permission::create(['name'=> 'show_all_employees']);
        $showOneEmployee = Permission::create(['name'=> 'show_one_employee']);
        $createEmployee = Permission::create(['name'=> 'create_employee']);
        $updateEmployee = Permission::create(['name'=> 'update_employee']);
        $deleteEmployee = Permission::create(['name'=> 'delete_employee']);
        $updatePasswordEmployee = Permission::create(['name'=> 'update_password_employee']);
        $updateAvatarEmployee = Permission::create(['name'=> 'update_avatar_employee']);
        $updateInfoEmployee = Permission::create(['name'=> 'update_info_employee']);

        //order
        $showAllOrders = Permission::create(['name'=> 'show_all_orders']);
        $showOneOrder = Permission::create(['name'=> 'show_one_order']);
        $showAllOrdersById = Permission::create(['name'=> 'show_all_orders_by_id']);
        $createOrder = Permission::create(['name'=> 'create_order']);
        $updateOrder = Permission::create(['name'=> 'update_order']);

        //user
        $showAllUsers = Permission::create(['name'=> 'show_all_users']);
        $showOneUser = Permission::create(['name'=> 'show_one_user']);
        $createUser= Permission::create(['name'=> 'create_user']);
        $deleteUser = Permission::create(['name'=> 'delete_user']);
        $updatePasswordUser = Permission::create(['name'=> 'update_password_user']);
        $updateAvatarUser = Permission::create(['name'=> 'update_avatar_user']);
        $updateInfoUser = Permission::create(['name'=> 'update_info_user']);

        //payment
        $showAllPayments = Permission::create(['name'=> 'show_all_payments']);
        $showOnePayment = Permission::create(['name'=> 'show_one_payment']);
        $createPayment = Permission::create(['name'=> 'create_payment']);
        $createPaymentVNPay = Permission::create(['name'=> 'create_payment_vnpay']);

        //role
        $showAllRoles = Permission::create(['name'=> 'show_all_roles']);
        $showOneRole = Permission::create(['name'=> 'show_one_role']);

        //reservation
        $showAllReservations = Permission::create(['name'=> 'show_all_reservations']);
        $createReservation = Permission::create(['name'=> 'create_reservation']);

        //table
        $showAllTables = Permission::create(['name'=> 'show_all_tables']);
        $showOneTable = Permission::create(['name'=> 'show_one_table']);
        $createTable = Permission::create(['name'=> 'create_table']);
        $updateTable = Permission::create(['name'=> 'update_table']);
        $deleteTable = Permission::create(['name'=> 'delete_table']);

        //reviews
        $createReview = Permission::create(['name'=> 'create-review']);

        //admin Permission
        $adminPermissions = [
            //account
            $getAccountAdmin,
            //product
            $createProduct,
            $updateProduct, 
            $deleteProduct,
            //category
            $createCategory,
            $updateCategory,
            $deleteCategory,
            $addProductToCategory,
            //employee
            $showAllEmployees,
            $showOneEmployee,
            $createEmployee, 
            $updateEmployee,
            $deleteEmployee,
            //order
            $showAllOrders,
            $showOneOrder,
            $updateOrder,
            //user
            $showAllUsers,
            $showOneUser,
            $createUser,
            $deleteUser,
            //payment
            $showAllPayments,
            $showOnePayment,
            //role
            $showAllRoles,
            $showOneRole,
            //revervation
            $showAllReservations,
            //table
            $showAllTables,
            $showOneTable,
            $createTable,
            $updateTable,
            $deleteTable,
        ];

        $admin->syncPermissions($adminPermissions);

        //employee Permission
        $employeePermissions = [
            //account
            $getAccountAdmin,
            //product
            $createProduct,
            $updateProduct, 
            $deleteProduct,
            //category
            $createCategory,
            $updateCategory,
            $deleteCategory,
            $addProductToCategory,
            //employee
            $updateAvatarEmployee,
            $updateInfoEmployee,
            $updatePasswordEmployee,
            //order
            $showAllOrders,
            $showOneOrder,
            $updateOrder,
            //user
            $showAllUsers,
            $showOneUser,
            $createUser,
            $deleteUser,
            //payment
            $showAllPayments,
            $showOnePayment,
            //role
            $showAllRoles,
            $showOneRole,
            //revervation
            $showAllReservations,
            //table
            $showAllTables,
            $showOneTable,
            $createTable,
            $updateTable,
            $deleteTable,
        ];

        $employee->syncPermissions($employeePermissions);

         //user Permission
         $userPermissions = [
            //account
            $getAccountUser,
            //order
            $showOneOrder,
            $showAllOrdersById,
            $updateOrder,
            $createOrder,
            //user
            $updatePasswordUser,
            $updateAvatarUser,
            $updateInfoUser,
            //role
            $showAllRoles,
            $showOneRole,
            //review
            $createReview,
            //revervation
            $showAllReservations,
            $createReservation,
            //table
            $showAllTables,
            $showOneTable,
            //payment
            $createPayment,
            $createPaymentVNPay,
            //cart
            $getCart,
            $updateCart,
            $deleteProductFromCart
        ];

        $user->syncPermissions($userPermissions);

    }
}
