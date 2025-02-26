// menggunakkan fitur react 
import React from "react";
// untuk navigasi dan struktur halaman
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// membungkus konten
import Container from "@/Components/Container";
// Inertia.js untuk menambahkan tag <head> dan untuk mengakses data halaman serta mengelola form
import { Head, useForm, usePage } from "@inertiajs/react";
// beberapa komponen 
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Checkbox from "@/Components/Checkbox";
// notifikasi pada user jika berhasil mengirimkan data
import Swal from "sweetalert2";

// membuat data role
export default function Create({ auth }) {
    // destruct permissions from usepage props
    const { permissions } = usePage().props;

    // define state with helper inertia
    // proses pembuatan role
    const { data, setData, post, errors, processing } = useForm({
        // 1 isi nama role 
        name: "",
        // 2 Daftar izin yang dipilih untuk role 
        selectedPermissions: [],
        // data: untuk menyimpan data
        // setData: update data
        // post: mengirimkan data ke server melalui HTTP
        // errors: memeberikan pesan jika ada kesalahan 
        // processing: status data sedang di peroses / tidak
    });


    // define method handleSelectedPermissions
    const handleSelectedPermissions = (e) => {
        // handleSelectedPermissions digunakan untuk menambah izin yang dipilih ke dalam array selectedPermissions
        let items = data.selectedPermissions;

        items.push(e.target.value);

        setData("selectedPermissions", items);
        // Setiap kali pengguna memilih checkbox izin, nilai izin tersebut akan ditambahkan ke dalam array.
    };

    // define method handleStoreData
    // dipanggil ketika form disubmit
    const handleStoreData = async (e) => {

        // mencegah reload halaman
        e.preventDefault();

        // Mengirimkan data ke server 
        post(route("roles.store"), {

            // jika data berhasil disimpan muncul notif
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data created successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Role
                </h2>
            }
        >


            <Head title={"Create Roles"} />
            <Container>
                <Card title={"Create new role"}>
                    {/* tampilan form */}
                    <form onSubmit={handleStoreData}>
                        <div className="mb-4">
                            <Input
                                label={"Role Name"}
                                type={"text"}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                errors={errors.name}
                                placeholder="Input role name.."
                            />
                        </div>
                        <div className="mb-4">
                            {/* <div className={`p-4 rounded-t-lg border bg-white`}>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    Permissions
                                </div>
                            </div> */}
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(permissions).map(
                                    ([group, permissionItems], i) => (
                                        <div
                                            key={i}
                                            className="p-4 bg-white rounded-lg shadow-md"
                                        >
                                            <h3 className="font-bold text-lg mb-2">
                                                {group}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {permissionItems.map(
                                                    (permission) => (
                                                        <Checkbox
                                                            label={permission}
                                                            value={permission}
                                                            onChange={
                                                                handleSelectedPermissions
                                                            }
                                                            key={permission}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            {/* menampilkan pesan error */}
                                            {errors?.selectedPermissions && (
                                                <div className="text-xs text-red-500 mt-4">
                                                    {errors.selectedPermissions}
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type={"submit"}  />
                            <Button
                                type={"cancel"}
                                url={route("roles.index")}
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
// Komponen Create ini digunakan untuk membuat role baru dalam aplikasi dengan memilih izin-izin yang terkait. Fungsi utama dari komponen ini adalah:
// Menyediakan form input untuk nama role dan daftar izin yang dapat dipilih.
// Menyimpan data role baru menggunakan Inertia.js dengan mengirimkan data ke server.
// Menampilkan pesan sukses menggunakan SweetAlert2 setelah data berhasil disimpan.
// Menangani pengaturan status form dan validasi kesalahan jika ada.