// usePage  untuk mengambil properti yang dikirim dari backend ke frontend
// data otentikasi pengguna dikirim melalui properti props.auth.
import { usePage } from "@inertiajs/react";


export default function hasAnyPermission(permissions){
    // menerima parameter permissions, yaitu sebuah array yang berisi daftar izin (permissions) yang ingin dicek
    // mengembalikan true jika pengguna memiliki setidaknya satu dari izin yang diberikan, atau false jika tidak



    // destruct auth from usepage props
    // destructuring untuk mengambil objek auth dari props
    // auth berisi informasi pengguna yang sedang login, termasuk daftar izin (permissions).
    const { auth } = usePage().props


    // get all permissions from props auth
    // Mengambil semua izin yang dimiliki pengguna saat ini dari auth.permissions.
    let allPermissions = auth.permissions;

    // define has permission is false
    // nilai false. Jika ada izin yang cocok nanti, nilainya akan diubah menjadi true.
    let hasPermission = false;

    // loop permissions
    //  forEach untuk memeriksa setiap izin dalam array permissions.
    //  izin (item) yang cocok dengan salah satu kunci dalam allPermissions, maka hasPermission akan diubah menjadi true
    permissions.forEach(function(item){
        // do it if permission is match with key
        if(allPermissions[item])
            // assign hasPermission to true
            hasPermission = true;
    });

    // minimal satu izin yang cocok, fungsi akan mengembalikan true, jika tidak, akan mengembalikan false.
 return hasPermission;

   
}
// Fungsi hasAnyPermission berfungsi untuk mengecek apakah pengguna memiliki setidaknya satu izin dari daftar izin yang diberikan. 
// Ini berguna dalam sistem Role-Based Access Control (RBAC) pada aplikasi berbasis Laravel + Inertia.js + React