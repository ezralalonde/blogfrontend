// let locallinks1 = [
//   {
//     name: "Historical Places LOCALLLLL",
//     url: "https://www.historicplaces.ca/en/rep-reg/place-lieu.aspx?id=2500",
//   },
//   { name: "R.M. of Silverwood", url: "https://myrm.info/123" },
//   { name: "Whitewood", url: "http://townofwhitewood.ca/" },
//   { name: "Whitewood Herald", url: "https://grasslandsnews.ca" },
//   { name: "Whitewood Inn", url: "http://www.whitewoodinn.com/" },
//   { name: "Whitewood Livestock", url: "http://www.whitewoodlivestock.ca/" },
// ];
// let officeinfo1 = [
//   { name: "Address: Box 58, Whitewood, SK S0G 5C0LOCALLL", url: "#" },
//   { name: "Tel: 306.735.2344", url: "#" },
//   { name: "Fax: 306.735.4495", url: "#" },
//   { name: "Email:rm153@sasktel.net", url: "#" },
//   { name: "Emergency: 911", url: "#" },
// ];

export default function Footer({ footer }) {
  let locallinks = footer[0].locallinks.names;
  let officeinfo = footer[0].officeinfo;
  // console.log(officeinfo);
  return (
    <div>
      {/* {officeinfo1.map((item) => (
        <p>{item.name}</p>
      ))} */}
      <footer className="bg-gray-800" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {locallinks[0].name}
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {locallinks.slice(1).map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.url}
                          className="text-base text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {officeinfo[0]}
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {officeinfo.slice(1).map((item) => (
                      <li key={item}>
                        <a className="text-base text-gray-300 hover:text-white">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2021 RM of Willowdale No. 153
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
