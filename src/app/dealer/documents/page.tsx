const DealerDocuments = () => {

    return (
        <>
            <h1 className="text-3xl font-bold mb-5">Documents</h1>

            <div className="flex justify-items-center gap-5">

                <div className="w-[60%]">

                    <table className="table bg-white text-black">
                        <thead>
                            <tr>
                                <th className="text-black">Document Name</th>
                                <th className="text-black">Created</th>
                                <th className="text-black">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <a href="" className="text-blue-500 hover:underline">
                                        <h1 className="font-bold text-xl">Dealer Power of Attorney</h1>
                                    </a>
                                </td>

                                <td>
                                    <p className="text-base">8/13/2025</p>
                                </td>

                                <td>
                                    <button className="btn btn-outline">Re-Upload</button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>


                <div className="w-[40%] h-60 bg-white rounded-xl shadow-xs py-3">
                    <div className="w-full pt-3 flex items-center justify-center flex-col">
                        <h1 className="text-2xl pl-5 font-bold mb-5">Upload New Document</h1>
                        <input type="file" className="file-input text-center w-80" />
                        <p className="text-center">Supported Document Format: *.docx</p>
                        <button className="btn bg-blue-500 text-white w-80 mt-5">Upload Document</button>
                    </div>

                </div>
            </div>

        </>

    )

}

export default DealerDocuments;