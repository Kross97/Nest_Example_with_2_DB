(() => {
    /**
     * Получение данных от STDIN процесса-родителя
     * */
    process.stdin.on("data", (data) => {
        console.log(`Полученные данные от процесса родителя ${data}`);
    });
    /**
     * Перенаправление на STDOUT процесса родителя
     * */
    process.stdout.write(`
    'Тестирование запуска команды child_process.spawn(command[, args][, options])' \n
     Данные о внутреннем процессе: PID ${process.pid} \n
     Есть ли канал для обмена сообщениями ${process.channel}:${process.channel ? "Есть" : "Нет"} \n
     Есть ли канал stdout ${process.stdout}:${process.stdout ? "Есть" : "Нет"} \n
     CWD ${process.cwd()} \n
     ARGV внутреннего process ${process.argv} \n
     ARGV0 внутреннего process ${process.argv0} \n
    `);
    setTimeout(() => {
        process.stdout.write("Закрытие потока STDOUT через 10 секунд");
        // process.stdout.end(); // Не вызывает событие end у stdout процесса родителя
    }, 10000);
    // process.stdout.end(); // Не вызывает событие end у stdout процесса родителя
    process.exit(0); // Завершает работу процесса и вызывает end у stdout процесса родителя
})();
//# sourceMappingURL=spawn_test.js.map