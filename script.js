function convertToTable() {
  const input = document.getElementById('dataInput').value;
  const tableContainer = document.getElementById('tableContainer');
  const lines = input.trim().split('\n');
  
  if (lines.length === 0 || input.trim() === '') {
    tableContainer.innerHTML = '<p>데이터를 입력해주세요.</p>';
    return;
  }
  
  let html = '<table><thead><tr><th>순위</th><th>이름</th><th>승</th><th>무</th><th>패</th><th>승점 (전체/평균)</th><th>득실</th><th>승률</th><th>참가 횟수</th></tr></thead><tbody>';
  
  lines.forEach(line => {
    // 텍스트에서 불필요한 공백을 제거하고 슬래시(/)나 공백을 기준으로 데이터를 분리
    const data = line.trim().split(/\s*\/\s*|\s+/);
    
    // 데이터가 충분한지 확인 (최소한의 컬럼 수)
    if (data.length >= 8) {
      const rank = data[0].replace('.', ''); // 순위에서 점(.) 제거
      const name = data[1];
      const win = data[2];
      const draw = data[3];
      const lose = data[4];
      const points = data[5] + ' / ' + data[6];
      const goalDiff = data[7];
      const winRate = data[8];
      const participation = data[9];
      
      html += `<tr>
                <td>${rank}</td>
                <td>${name}</td>
                <td>${win}</td>
                <td>${draw}</td>
                <td>${lose}</td>
                <td>${points}</td>
                <td>${goalDiff}</td>
                <td>${winRate}</td>
                <td>${participation}</td>
              </tr>`;
    }
  });
  
  html += '</tbody></table>';
  tableContainer.innerHTML = html;
}
