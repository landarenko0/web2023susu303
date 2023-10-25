const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();

            // TODO
            assert.strictEqual(!!dic, true);
        });

        if('Слова в книге не существует', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(dic.getDescription("Книга"), "Слово отсутствует в словаре");
        });

        it('Слово в кинге существует', () => {
            const dic = new core.Dictionary();

            dic.addWord("SQL", "Structured Query Language");
            assert.strict(dic.getDescription("SQL", "Structured Query Language"));
        });

        it('Слово удалено из книги', () => {
            const dic = new core.Dictionary();

            dic.addWord("SQL", "Structured Query Language");
            dic.deleteWord("SQL");

            assert.strictEqual(dic.getDescription("SQL"), "Слово отсутствует в словаре");
        });
    });
});