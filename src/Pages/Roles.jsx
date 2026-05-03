const RoleData = [
    {id: 1, name: "Admin"},
    {id: 2, name: "Deafult"}
]
function Roles(){
return(
    <div className="space-y-6">
        <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#5C4033]/70">Permissions</p>
                <h1 className="text-3xl font-extrabold text-[#5C4033]">Roles</h1>
                <button></button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#5C4033]/10 bg-white shadow-xl shadow-[#5C4033]/5">
        <table className="min-w-full">
            <thead className="bg-[#f8f6f4] text-xs uppercase tracking-wide text-[#5C4033]">
                <tr>
                <th className="px-5 py-4 text-left font-bold">ID</th>
                <th className="px-5 py-4 text-left font-bold">Name</th>
                <th className="px-5 py-4 text-center font-bold">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-[#5C4033]/10">
                {RoleData.map((status)=>(
                    <tr key={status.id} className="text-sm transition hover:bg-[#FFF8F0]">
                        <td className="px-5 py-4 font-semibold">{status.id}</td>
                        <td className="px-5 py-4">{status.name}</td>
                                                    
                        <td className="px-5 py-4 text-center">
                            <button className="mr-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700">Edit</button>
                            <button className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700">Delete</button>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>

)
}
export default Roles
