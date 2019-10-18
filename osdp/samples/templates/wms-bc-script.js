function parser(data, lang) {
    const table = $.parseHTML(data);
    
    let title = [];
    $(table[13]).find('th').each((index, th) => {
        title.push(th.textContent);
    });

    let value = [];
    $(table[13]).find('td').each((index, td) => {
        value.push(td.textContent !== '' ? td.textContent : '---');
    });

    let output = [];
    for (let [i, item] of title.entries()) {
        let tmp = {
            title: item,
            value: value[i]
        };
        output.push(tmp);
    }

    const inter = setInterval(() => {
        $('#bcDetails').css('opacity', 1).css('height', 'auto');
        clearInterval(inter)
    }, 1000);

    return { items: output };
}