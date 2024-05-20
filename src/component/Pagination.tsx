import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

interface PaginationProprs {
    length: number, 
    page: number, 
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination ({page, setPage, length}: PaginationProprs)  {
    const pagination = []
    const goNext = () => {
        if (page < length) {
            setPage(page+1)
        }
    }
    const goBack = () => {
        if (page > 1) {
            setPage(page-1)
        }
    }
    const goPage = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!event.currentTarget) {
            return
        }
        setPage(parseInt(event.currentTarget.innerHTML))
    }
    for (let i = 0; i < length; i++) {
        pagination[i] = <div 
                            key={i} 
                            className={`text-center p-2 rounded-md cursor-pointer ${page === i+1 ? 'bg-purple-800' : 'bg-slate-800'} transition-all duration-200`}
                            onClick={goPage}> 
                                {i+1} 
                        </div>
    }
    return (
        <div className={`flex flex-row items-center justify-between ${pagination.length === 0 ? "hidden" : ""}`}>
            <IoIosArrowBack className="cursor-pointer" onClick={goBack}/>
            <div className="flex flex-row justify-center gap-2">
                {
                    pagination.map(el => el)
                }
            </div>
            <IoIosArrowForward className="cursor-pointer" onClick={goNext}/>
        </div>
    )
}