import React from 'react';

function Report({ data }) {
  if (!data) return null;
  const { total, success, failed, errors } = data;
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Summary Report</h2>
      <ul>
        <li>Total records: {total}</li>
        <li>Successful: {success}</li>
        <li>Failed: {failed}</li>
      </ul>
      {errors?.length > 0 && (
        <details className="mt-2">
          <summary className="cursor-pointer">View errors</summary>
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(errors, null, 2)}</pre>
        </details>
      )}
    </div>
  );
}

export default Report;
