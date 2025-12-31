import { PersonalBook } from "../types/personalLibrary";

type ReportButtonsProps = {
  books: PersonalBook[];
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export default function ReportButtons({ books }: ReportButtonsProps) {
  const exportCSV = () => {
    if (!books || books.length === 0) {
      alert("Nenhum livro para exportar");
      return;
    }
    // headers: união de todas as chaves presentes nos livros
    const headers = Array.from(new Set(books.flatMap((b) => Object.keys(b))));
    const rows = books.map((b) =>
      headers
        .map((h) => {
          const v = b[h as keyof PersonalBook];
          if (Array.isArray(v)) return `"${v.join("; ")}"`;
          if (v === null || v === undefined) return "";
          return `"${String(v).replace(/"/g, '""')}"`;
        })
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\r\n");
    // BOM para Excel
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    downloadBlob(blob, "books.csv");
  };

  const exportXLSX = async () => {
    if (!books || books.length === 0) {
      alert("Nenhum livro para exportar");
      return;
    }
    try {
      const XLSX: typeof import("xlsx") = await import("xlsx");
      // normalizar dados: arrays -> string
      const headers = Array.from(new Set(books.flatMap((b) => Object.keys(b))));
      const normalized = books.map((b) => {
        const obj: Record<string, unknown> = {};
        headers.forEach((h) => {
          const v = b[h as keyof PersonalBook];
          if (Array.isArray(v)) obj[h] = v.join("; ");
          else if (v === null || v === undefined) obj[h] = "";
          else obj[h] = v;
        });
        return obj;
      });
      const ws = XLSX.utils.json_to_sheet(normalized, { header: headers });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Books");
      XLSX.writeFile(wb, "books.xlsx");
    } catch {
      // fallback para CSV se xlsx não estiver disponível
      exportCSV();
    }
  };

  const exportPDF = async () => {
    if (!books || books.length === 0) {
      alert("Nenhum livro para exportar");
      return;
    }
    try {
      const { jsPDF } = (await import("jspdf")) as typeof import("jspdf");
      const doc = new jsPDF();
      let y = 10;
      const pageHeight = 285;
      books.forEach((b, idx) => {
        const authors = Array.isArray(b.authors)
          ? b.authors.join(", ")
          : b.authors || "";
        const line = `${idx + 1}. ${b.title || ""} — ${authors} — ${
          b.publishedDate || ""
        }`;
        const lines = doc.splitTextToSize(line, 180);
        doc.text(lines, 10, y);
        y += (lines.length + 0.5) * 8;
        if (y > pageHeight) {
          doc.addPage();
          y = 10;
        }
      });
      doc.save("books.pdf");
    } catch {
      alert('Não foi possível gerar PDF. Instale "jspdf" para suporte ao PDF.');
    }
  };

  return (
    <div className="report-buttons">
      <p className="report-title">Exportar coleção:</p>
      <div className="report-buttons-row">
        <button
          type="button"
          onClick={exportXLSX}
          className="add-book-button export-collection"
          aria-label="Exportar coleção como arquivo Excel"
        >
          Excel
        </button>
        <button
          type="button"
          onClick={exportCSV}
          className="add-book-button export-collection"
          aria-label="Exportar coleção como arquivo CSV"
        >
          CSV
        </button>
        <button
          type="button"
          onClick={exportPDF}
          className="add-book-button export-collection"
          aria-label="Exportar coleção como arquivo PDF"
        >
          PDF
        </button>
      </div>
    </div>
  );
}
