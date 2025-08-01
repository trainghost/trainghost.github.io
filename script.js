function convertToTable() {
  // (이전과 동일한 코드)
  const input = document.getElementById('dataInput').value;
  const tableContainer = document.getElementById('tableContainer');
  const lines = input.trim().split('\n');
  
  if (lines.length === 0 || input.trim() === '') {
    tableContainer.innerHTML = '<p>데이터를 입력해주세요.</p>';
    return;
  }
  
  let html = '<table><thead><tr><th>순위</th><th>이름</th><th>참석</th><th>늦참</th><th>승</th><th>무</th><th>패</th><th>승점 (전체/평균)</th><th>득실</th><th>승률</th><th>참가 횟수</th></tr></thead><tbody>';
  
  lines.forEach(line => {
    const data = line.trim().split(/\s*\/\s*|\s+/);
    
    if (data.length >= 8) {
      const rank = data[0].replace('.', '');
      const name = data[1];
      const win = data[2];
      const draw = data[3];
      const lose = data[4];
      const points = data[5] + ' / ' + data[6];
      const goalDiff = data[7];
      const winRate = data[8];
      const participation = data[9];
      
      // 체크박스에 고유한 클래스 추가
      html += `<tr>
                <td>${rank}</td>
                <td>${name}</td>
                <td><input type="checkbox" class="참석-checkbox"></td>
                <td><input type="checkbox" class="늦참-checkbox"></td>
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

// 새로운 함수를 추가합니다.
function toggleAllCheckboxes(type) {
  const checkboxes = document.querySelectorAll(`.${type}-checkbox`);
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);

  checkboxes.forEach(cb => {
    cb.checked = !allChecked;
  });
}
