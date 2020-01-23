const router = require('express').Router();
const Student = require('../db/models/students');

router.get('/:studentId', function(req, res, next) {
  Student.findById(req.params.studentId)
    .then(student => {
      if (!student) return res.sendStatus(404);
      res.json(student);
    })
    .catch(next);
});

router.get('/', function(req, res, next) {
  Student.findAll().then(students => res.json(students));
});

router.post('/', function(req, res, next) {
  Student.create(req.body)
    .then(student => res.json(student))
    .catch(next);
});

router.put('/:id', function(req, res, next) {
  Student.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(test => res.status(201).json(test[1][0]))
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;

// router.param('id', (req, res, next, id) => {
//   try {
//     const user = User.findById(id, {
//       where: {
//         isAdmin: true
//       }
//     })

//     if (!user) {
//       const err = new Error('Not found!')
//       err.status = 401
//       next(err)
//     } else {
//       req.requestedUser = user
//       next()
//     }
//   } catch (err) {
//     next(err)
//   }
// })

function getAllPermutations(string) {
  debugger;
  var results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (var i = 0; i < string.length; i++) {
    var firstChar = string[i];
    var charsLeft = string.substring(0, i) + string.substring(i + 1);
    var innerPermutations = getAllPermutations(charsLeft);
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

getAllPermutations('abc');
