import NewsList from "@/components/news-list";
import { getAllNews, getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/utils-news";
import Link from "next/link";

export default async function ArchiveYearPage({ params }) {
    const filter = params.filter;
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];

    let news;
    let links = await getAvailableNewsYears();    

    if(selectedYear && !selectedMonth) {    
        try {
            news = await getNewsForYear(selectedYear);
            links = await getAvailableNewsMonths(selectedYear);

        } catch (error) {
            console.error("Error fetching news for year:", error);
            news = [];
        }
    } else if(selectedYear && selectedMonth) {
        news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = []
    } else {
        news = await getAllNews();
    }

    let newsContent = <p>No news found for the selected period.</p>;

    if(news && news.length > 0) {
        newsContent = <NewsList news={news} />;
    }

    return (
        <>
            <header id="archive-header">
                <nav>
                    <ul>
                        {Array.isArray(links) ? links.map(link => {
                            const href = selectedYear 
                                ? `/archive/${selectedYear}/${link}` 
                                : `/archive/${link}`;
                            
                            return (
                                <li key={link}>
                                    <Link href={href}>{link}</Link>
                                </li>
                            )
                        }) : <p>No links available</p>}
                    </ul>
                </nav>
            </header>
            {newsContent}
        </>
    )
}