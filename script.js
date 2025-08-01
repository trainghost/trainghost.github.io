const playerData = {
  "장다민": { gender: "여" },
  "양승하": { gender: "남" },
  "우원석": { gender: "남" },
  "남상윤": { gender: "남" },
  "임예지": { gender: "여" },
  "이준희": { gender: "여" },
  "강민구": { gender: "남" },
  "임동민": { gender: "남" },
  "박소현": { gender: "여" },
  "박대우": { gender: "남" },
  "박은지": { gender: "여" },
  "류재리": { gender: "여" },
  "이재현": { gender: "남" },
  "감사": { gender: "남" },
  "나석훈": { gender: "남" },
  "김나연": { gender: "여" },
  "테스": { gender: "남" },
  "독고혁": { gender: "남" },
  "오리": { gender: "여" },
  "이성훈": { gender: "남" },
  "이종욱": { gender: "남" },
  "최하나": { gender: "여" },
  "김보경": { gender: "여" },
  "김경민": { gender: "남" },
  "모딩": { gender: "여" },
};

function convertToTable() {
  const input = document.getElementById('dataInput').value;
  const tableContainer = document.getElementById('tableContainer');
  const lines = input.trim().split('\n');
  
  if (lines.length === 0 || input.trim() === '') {
    tableContainer.innerHTML = '<p>데이터를 입력해주세요.</p>';
    return;
  }
  
  let html = '<table><thead><tr><th>순위</th><th>이름</th><th>성별</th><th>참석</th><th>늦참</th><th>승</th><th>무</th><th>패</th><th>승점 (전체/평균)</th><th>득실</th><th>승률</th><th>참가 횟수</th></tr></thead><tbody>';
  
  lines.forEach(line => {
    const data = line.trim().split(/\s*\/\s*|\s+/);
    
    if (data.length >= 8) {
      const rank = data[0].replace('.', '');
      const name = data[1];
      const gender = playerData[name] ? playerData[name].gender : '알 수 없음';
      const win = data[2];
      const draw = data[3];
      const lose = data[4];
      const points = data[5] + ' / ' + data[6];
      const goalDiff = data[7];
      const winRate = data[8];
      const participation = data[9];
      
      html += `<tr>
                <td data-rank="${rank}">${rank}</td>
                <td>${name}</td>
                <td>${gender}</td>
                <td><input type="checkbox" class="참석-checkbox" data-name="${name}"></td>
                <td><input type="checkbox" class="늦참-checkbox" data-name="${name}"></td>
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

function createBracket() {
  const bracketContainer = document.getElementById('bracketContainer');
  bracketContainer.innerHTML = '';

  const checkedFemalePlayers = Array.from(document.querySelectorAll('.참석-checkbox:checked'))
    .map(cb => {
      const name = cb.getAttribute('data-name');
      const row = cb.closest('tr');
      const rank = parseInt(row.querySelector('td[data-rank]').getAttribute('data-rank'));
      return { name, rank, gender: playerData[name].gender };
    })
    .filter(player => player.gender === '여');

  if (checkedFemalePlayers.length !== 4) {
    bracketContainer.innerHTML = '<p>여자 선수 4명을 참석으로 체크해야 대진표를 만들 수 있습니다.</p>';
    return;
  }

  checkedFemalePlayers.sort((a, b) => a.rank - b.rank);
  
  const teamA = [checkedFemalePlayers[0].name, checkedFemalePlayers[3].name];
  const teamB = [checkedFemalePlayers[1].name, checkedFemalePlayers[2].name];

  const bracketHTML = `
    <h3>1번경기 (여자)</h3>
    <p><strong>Team A:</strong> ${teamA[0]} &amp; ${teamA[1]}</p>
    <p><strong>Team B:</strong> ${teamB[0]} &amp; ${teamB[1]}</p>
    <p><strong>Match Up:</strong> Team A vs Team B</p>
  `;
  
  bracketContainer.innerHTML = bracketHTML;
}

// 2번 경기 대진표 생성 함수
function createBracket2() {
    const bracketContainer = document.getElementById('bracketContainer');
    
    // '참석'에 체크되었고 '늦참'에 체크되지 않은 선수들
    const availablePlayers = Array.from(document.querySelectorAll('.참석-checkbox:checked'))
        .filter(cb => !cb.closest('tr').querySelector('.늦참-checkbox').checked)
        .map(cb => {
            const name = cb.getAttribute('data-name');
            const row = cb.closest('tr');
            const rank = parseInt(row.querySelector('td[data-rank]').getAttribute('data-rank'));
            return { name, rank };
        });

    if (availablePlayers.length !== 4) {
        const currentHTML = bracketContainer.innerHTML;
        bracketContainer.innerHTML = `${currentHTML}<p>2번 경기를 만들려면 늦참을 제외한 참석 선수가 정확히 4명이어야 합니다.</p>`;
        return;
    }

    // 순위대로 정렬
    availablePlayers.sort((a, b) => a.rank - b.rank);

    // 팀 구성: 순위 제일 높은 사람(1등)과 낮은 사람(4등)이 팀
    const teamC = [availablePlayers[0].name, availablePlayers[3].name];
    const teamD = [availablePlayers[1].name, availablePlayers[2].name];

    // 대진표 HTML 추가
    const bracketHTML = `
        <hr>
        <h3>2번경기 (남녀 통합)</h3>
        <p><strong>Team C:</strong> ${teamC[0]} &amp; ${teamC[1]}</p>
        <p><strong>Team D:</strong> ${teamD[0]} &amp; ${teamD[1]}</p>
        <p><strong>Match Up:</strong> Team C vs Team D</p>
    `;
    
    const currentHTML = bracketContainer.innerHTML;
    bracketContainer.innerHTML = currentHTML + bracketHTML;
}
