import Ember from 'ember';
import DialogueLine from './dialogue-line';
import SequentialDialogueLine from './sequential-dialog-line';
import BasicMetadata from '../generics/basic-metadata';
import LivingEntity from '../entities/living-entity';

export default Ember.Object.extend(BasicMetadata, Ember.Evented, {

  autoPlayDialogue: false,

  autoPlayDialogueCallback: null,

  defaultDialogueLineInterval: 10,

  dialogants: Ember.computed(function() { return Ember.A(); }),

  lines: Ember.computed(function() { return Ember.A(); }),

  lineQueue: Ember.computed(function() { return Ember.A(); }),

  addDialogant: function(dialogant) {
    Ember.assert(dialogant.get('_type') === 'LivingEntity',
      'sequentialDialogue.addDialogant: dialogant must be an ' +
      'instance of LivingEntity');

    this.get('dialogants').addObject(dialogant);
  },

  removeDialogant: function(dialogant) {
    let uuid = typeof dialogant === 'string' ? dialogant : dialogant.get('_uuid');

    this.set('dialogants',
      this.get('dialogants').rejectBy('_uuid', uuid));

    this.set('lines',
      this.get('lines').rejectBy('dialogantEntityUUID', uuid));
  },

  _getDialogantLineCount: function(dialogantEntityUUID) {
    return this.get('lines').findBy('dialogantEntityUUID',
      dialogantEntityUUID).length;
  },

  addLine: function(dialogant, line) {
    let uuid = typeof dialogant === 'string' ? dialogant : dialogant.get('_uuid');

    Ember.assert(this.get('dialogants').findBy('_uuid', uuid),
      'sequentialDialogue.addLine: dialogant must be registered' +
      ' with addDialogant');

    let dialogIndex = this._getDialogantLineCount(uuid);

    let dialogueLine = typeof line === 'string' ? DialogueLine.create({
      id: uuid + '-' + dialogIndex,
      line: line
    }) : line;

    if (dialogueLine.get('duration') === null &&
      this.get('autoPlayDialogue')) {
      dialogueLine.set('duration',
        this.get('defaultDialogueLineInterval'));
    }

    this.get('lines').pushObject(SequentialDialogueLine.create({
      dialogantEntityUUID: uuid,
      dialogueLine: dialogueLine
    }));
  },

  startDialog: function() {
    this.set('lineQueue', this.get('lines'));
    this.followDialog();
  },

  followDialog: function() {
    let line = this.get('lineQueue').shift();
    if (line) {
      this.get('autoPlayDialogueCallback').call(this, line);
      Ember.run.later(this.followDialog, line.get('duration') * 1000);
    } else {
      this.trigger('dialogEnded');
    }
  },

  /**
   * Template
   *
   * SDLG:intro_dialog{Joe,Jill}
   * {0,Joe}Hey there!
   * {5,Jill}Hey there, Jill
   *
   */
  parseFromScript: null,

  parseFromScriptChanged: Ember.observer('parseFromScript', function() {
    let _this = this;
    let script = this.get('parseFromScript');
    if (!script) {
      return;
    }

    let lines = script.split('\n').map(function(s) {
      return s.trim();
    }).filter(function(s) {
      return s !== '';
    });

    let header = lines.shift();
    if (header.indexOf('SDLG') < 0 || header.indexOf(':') < 0 ||
        header.indexOf('{') < 0 || header.indexOf('}') < 0) {
      return;
    }

    this.set('id',
      header.substring(header.indexOf(':') + 1, header.indexOf('{')));

    let dialogantsList = header.substring(header.indexOf('{') + 1,
      header.indexOf('}')).split(',');

    dialogantsList.forEach(function(dialogant) {
      let names = {};
      if (dialogant.indexOf(' ') < 0) {
        names.first = dialogant;
      } else {
        let _names = dialogant.split(' ');
        names.first = _names[0];
        names.last = _names[1];
      }
      _this.addDialogant(LivingEntity.create({
        firstName: names.first,
        lastName: names.last
      }));
    });

    lines.forEach(function(line) {
      let metadata = line.substring(line.indexOf('{') + 1,
        line.indexOf('}')).split(',');
      let duration = metadata[0];
      let dialogant = metadata[1];
      let text = line.substring(line.indexOf('}') + 1);
      _this.addLine(dialogant, DialogueLine.create({
        line: text,
        duration: duration
      }));
    });
  })

});
