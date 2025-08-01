// 성별 정보를 저장하는 객체
const playerData = {
  "장다민": "여",
  "양승하": "남",
  "우원석": "남",
  "남상윤": "남",
  "임예지": "여",
  "이준희": "여",
  "강민구": "남",
  "임동민": "남",
  "박소현": "여",
  "박대우": "남",
  "박은지": "여",
  "류재리": "여",
  "이재현": "남",
  "감사": "남",
  "나석훈": "남",
  "김나연": "여",
  "테스": "남",
  "독고혁": "남",
  "오리": "여",
  "이성훈": "남",
  "이종욱": "남",
  "최하나": "여",
  "김보경": "여",
  "김경민": "남",
  "모딩": "여",
};

function convertToTable() {
  const input = document.getElementById('dataInput').value;
  const tableContainer = document.getElementById('tableContainer');
  const lines = input.trim().split('\n');

  if (lines.length === 0 || input.trim() === '') {
    tableContainer.innerHTML = '<p>데이터를 입력해주세요.</p>';
    return;
  }

  // 테이블 헤더에 '성별' 열 추가
  let html = '<table><thead><tr><th>순위</th><th>이름</th><th>성별</th><th>참석</th><th>늦참</th><th>승</th><th>무</th><th>패</th><th>승점 (전체/평균)</th><th>득실</th><th>승률</th><th>참가 횟수</th></tr></thead><tbody>';

  lines.forEach(line => {
    const data = line.trim().split(/\s*\/\s*|\s+/);

    if (data.length >= 8) {
      const rank = data[0].replace('.', '');
      const name = data[1];
      const gender = playerData[name] || '알 수 없음'; // 이름으로 성별 정보 찾기
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
                <td>${gender}</td> <td><input type="checkbox" class="참석-checkbox"></td>
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

function toggleAllCheckboxes(type) {
  const checkboxes = document.querySelectorAll(`.${type}-checkbox`);
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);

  checkboxes.forEach(cb => {
    cb.checked = !allChecked;
  });
}
