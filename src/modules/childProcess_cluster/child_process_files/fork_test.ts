(() => {
  /**
   *
   * Т.к в методе child_process.fork(modulePath[, args][, options]) отсутсвует stdout поток
   * то process.stdout.write пише данные прямо в консоль терминала
   *
   * */

  let count = 1;

  process.stdout.write(`
    'Тестирование запуска команды child_process.fork(modulePath[, args][, options])' \n
     Данные о внутреннем процессе: PID ${process.pid} \n
     Есть ли канал для обмена сообщениями ${process.channel}:${process.channel ? "Есть" : "Нет"} \n
     Есть ли канал stdout ${process.stdout}:${process.stdout ? "Есть" : "Нет"} \n
     CWD ${process.cwd()} \n
     ARGV внутреннего process ${process.argv} \n
     ARGV0 внутреннего process ${process.argv0} \n
    `);

  process.on("message", (data) => {
    process.stdout.write(`[Сообщение принятое дочерним процессом] -> ${data} \n`);
    process.send(`Сообщение #${count} от дочернего процесса родительскому процессу`);
    count++;
  });
})();
