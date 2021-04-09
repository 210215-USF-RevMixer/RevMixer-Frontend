import { TestBed } from '@angular/core/testing';
import { SampleSets } from '../Models/SampleSets';
import {User} from '../Models/User'; 
import { SampleSetService } from './sample-set.service';

describe('SampleSetService', () => {
  let service: SampleSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GetAllSampleSets should return any observable', () => {
    service.GetAllSampleSets().subscribe(result => {
      expect(result instanceof Object).toBeTruthy();
    });



    it('AddSampleSet should return any Observable', () => {
      let user: User = {id: 1,
        userName: 'string',
        email: 'string',
        isAdmin: false,
    
        userProjects: [],
        sample: [],
        comments: [],
        uploadMusics: [],
        playlists: []};

      let sampleSet : SampleSets={
        id: 1,
        name: 'string',
        userId: 1,
        isPrivate: false,
        user: user,
        samples: [],
      }
      service.AddSampleSet(sampleSet).subscribe (result =>{
        expect (result instanceof (Object )). toBeTruthy();
      });
    });
    
  });

  
});
