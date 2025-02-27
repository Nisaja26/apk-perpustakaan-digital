// komponen react
import React from "react";
// struktur layout
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// membungkus konten
import Container from "@/Components/Container";
// untuk mengelola state dan komunikasi dengan server menggunakan Inertia.js.
import { Head, useForm, usePage } from "@inertiajs/react";
// beberapa komponen
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Checkbox from "@/Components/Checkbox";
// notifikasi jika berhasil kirim data
import Swal from "sweetalert2";

//  ini menerima auth sebagai prop yang berisi informasi pengguna yang sedang login
export default function Edit({ auth }) {
    // destruct permissions from usepage props
    const { permissions, role } = usePage().props;
    // usePage() untuk mengakses data yang diberikan oleh Inertia.js.
    //  Di sini, kita menerima permissions dan role dari props yang dikirim dari server:

    // define state with helper inertia
    const { data, setData, post, errors } = useForm({
        //  useForm hook untuk menangani form state dengan mudah, termasuk mengelola input data dan error.
        name: role.name,
        selectedPermissions: role.permissions.map(
            (permission) => permission.name
        ),
        _method: "put",
    });

    // define method handleSelectedPermissions
    const handleSelectedPermissions = (e) => {
        let items = data.selectedPermissions;

        if (items.includes(e.target.value))
            items.splice(items.indexOf(e.target.value), 1);
        else items.push(e.target.value);
        setData("selectedPermissions", items);
        //  Ketika checkbox diklik, kita memeriksa apakah permission sudah ada di dalam daftar selectedPermissions.
        //  Jika sudah ada, kita menghapusnya; jika tidak, kita menambahkannya.
    };

    // define method handleUpdateData
    //  untuk mengirimkan data form ke server saat form disubmit
    const handleUpdatedata = async (e) => {
        e.preventDefault();

        post(route("roles.update", role.id), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data created successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    // post untuk mengirimkan data ke server dengan metode PUT (karena kita sedang mengedit data yang sudah ada)
                });
            },
        });
    };

    // membangun tampilan form untuk mengedit role.
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Role
                </h2>
            }
        >
            {/*  Input field untuk memasukkan nama role */}
            <Head title={"Edit Roles"} />
            <Container>
                <Card title={"Edit role"}>
                    <form onSubmit={handleUpdatedata}>
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
                        {/* Menampilkan daftar permissions yang dapat dipilih, diatur dalam grup berdasarkan permissions yang diterima. */}
                        <div className="mb-4">
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
                                                            defaultChecked={data.selectedPermissions.includes(
                                                                permission
                                                            )}
                                                            key={permission}
                                                        />
                                                    )
                                                )}
                                            </div>
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

                        {/* tombol */}
                        <div className="flex items-center gap-2">
                            <Button type={"submit"}  />
                            <Button
                                type={"cancel"}
                                url={route("roles.index")}
                                //  jika sudah selesai kembali ke halaman daftar role
                            />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
// Komponen Edit digunakan untuk mengedit role dalam aplikasi, dengan fitur-fitur seperti:
// Form untuk mengedit nama role.
// Daftar permissions dengan checkbox untuk memilih permissions yang diinginkan.
// Handling validasi error dan pengiriman data ke server menggunakan Inertia.js.
// Penggunaan SweetAlert untuk menampilkan pemberitahuan sukses setelah data berhasil disimpan.