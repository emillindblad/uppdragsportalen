const a = <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" scope="row">Uppdrag</td>;
const b = <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">NollKIT</td>;
const c = <td className="px-6 py-4 font-medium whitespace-nowrap text-black font-bold">Ej granskad</td>;
const d = <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"></td>;

const Assignment = [a,b,c,d];

const AssignmentData = () => {
    return (
        <>
        {[Assignment,Assignment,Assignment,Assignment,Assignment,Assignment,Assignment].map((value) => 
            <tr className="bg-white border-b">{value}</tr>)}
        </>
    );
};

export default AssignmentData;