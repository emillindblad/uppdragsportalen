import Link from "next/link";

{/* Only for MK */}
const UppdragComment = () => {
    return (
        <>
            <div className="flex row-start-6 col-start-1 col-span-7 items-end px-2">
                <textarea id="mkComment" className="mt-6 h-[20vh] w-full flex-1 rounded-2xl block p-3.5 text-2xl bg-white border border-gray-300 focus:ring-mk-blue focus:border-mk-blue resize-none" placeholder="Kommentarer.."></textarea>
            </div>
            <div className="flex row-start-7 col-start-1 col-end-7 items-end justify-between pb-4 px-2">
                <div className="col-start-1 col-span-1">
                    <Link href="/home">
                        <button className="h-[44px] w-[125px] bg-mk-yellow hover:bg-mk-yellow-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Tillbaka</button>
                    </Link>
                </div>
                <div className="flex col-end-7 col-span-4">
                    <div className="flex justify-between mr-6">
                        <div className="flex items-center mr-6">
                            <input type="radio" id="neka" value="" name="default-radio" className="w-4 h-4 text-mk-blue bg-gray-100 border-gray-300 focus:ring-mk-blue"/>
                            <label htmlFor="neka" className="ml-2 text-lg font-bold text-black">Neka</label>
                        </div>
                        <div className="flex items-center mr-6">
                            <input type="radio" id="retur" value="" name="default-radio" className="w-4 h-4 text-mk-blue bg-gray-100 border-gray-300 focus:ring-mk-blue"/>
                            <label htmlFor="retur" className="ml-2 text-lg font-bold text-black">Retur</label>
                        </div>
                        <div className="flex items-center mr-6">
                            <input type="radio" id="ok" value="" name="default-radio" className="w-4 h-4 text-mk-blue bg-gray-100 border-gray-300 focus:ring-mk-blue"/>
                            <label htmlFor="ok"className="ml-2 text-lg font-bold text-black">Godkänn</label>
                        </div>
                    </div>
                    <div className="flex">
                        <Link href="/home">
                            <button className="h-[44px] w-[125px] bg-mk-blue hover:bg-mk-blue-hover text-white text-lg rounded-2xl font-bold px-6 py-2" type="button">Skicka</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UppdragComment;