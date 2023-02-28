import moment from "moment";
import Link from "next/link";
import { Languages } from ".";

const findLanguage = (ext) => {
  return Languages.find((lang) => lang.ext === ext);
};

export const PasteColumns = [
  {
    id: "title",
    name: "Title",
    selector: (row) => row.title,
    cell: (row) => (
      <Link
        style={{ color: "#2990d1" }}
        href={`https://paste-bin-nu.vercel.app/paste/${row?.pasteKey}`}
      >
        {row.title}
      </Link>
    ),
    sortable: true,
    reorder: true,
  },
  {
    id: "author",
    name: "Author",
    selector: (row) => row.author,
    sortable: true,
  },
  {
    id: "language",
    name: "Language",
    selector: (row) => row.language,
    format: (row) => findLanguage(row.language)?.label,
    sortable: true,
  },

  {
    id: "created",
    name: "Created",
    selector: (row) => row.createdAt,
    format: (row) => moment(row.createdAt).format("ll"),
    sortable: true,
  },
];
