export default function ArchiveLayout({ archive, latest }) {
    return (
    <div className="archive-layout">
        <h1>News Archive</h1>
            <section id="archive-filter">{archive}</section>
            <section id="latest-filter">{latest}</section>
        </div>
    );
}