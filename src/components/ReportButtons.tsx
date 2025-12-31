import { useMemo } from "react";
import { PersonalBook } from "../types/personalLibrary";

type ReportButtonsProps = {
  books: PersonalBook[];
};

const createToast = (message: string) => {
  const id = `toast-${Date.now()}`;
  const el = document.createElement("div");
  el.id = id;
  el.textContent = message;
  Object.assign(el.style, {
    position: "fixed",
    right: "16px",
    bottom: "16px",
    background: "rgba(0,0,0,0.8)",
    color: "white",
    padding: "10px 14px",
    borderRadius: "8px",
    zIndex: "9999",
    fontSize: "14px",
  });
  document.body.appendChild(el);
  setTimeout(() => {
    el.remove();
  }, 3000);
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  // ensure download triggered before cleanup
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 0);
};

export default function ReportButtons({ books }: ReportButtonsProps) {
  const headers = useMemo(
    () =>
      books && books.length > 0
        ? Array.from(new Set(books.flatMap((b) => Object.keys(b))))
        : [],
    [books]
  );

  const sanitizeForCsv = (value: unknown) => {
    if (value === null || value === undefined) return "";
    let s = Array.isArray(value) ? value.join("; ") : String(value);
    // prevent CSV injection: prefix = + - @ with a single quote
    if (s.length > 0 && ["=", "+", "-", "@"].includes(s[0])) s = `'${s}`;
    // escape double quotes
    s = s.replace(/"/g, '""');
    return `"${s}"`;
  };

  const exportCSV = () => {
    if (!books || books.length === 0) {
      createToast("Nenhum livro para exportar");
      return;
    }
    const rows = books.map((b) =>
      headers
        .map((h) => {
          const v = b[h as keyof PersonalBook];
          return sanitizeForCsv(v);
        })
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    downloadBlob(blob, "books.csv");
  };

  const exportXLSX = async () => {
    if (!books || books.length === 0) {
      createToast("Nenhum livro para exportar");
      return;
    }
    try {
      const XLSX: typeof import("xlsx") = await import("xlsx");
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
      createToast("Nenhum livro para exportar");
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
      createToast('Não foi possível gerar PDF. Instale "jspdf" para suporte ao PDF.');
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
