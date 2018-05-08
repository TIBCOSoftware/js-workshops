var taggle = new Taggle('example6');

taggle.add(coffeeSelection1);
taggle.add(['two', 'three', 'four', 'four', 'five', 'five']);
taggle.remove('five');
taggle.remove('four', true);