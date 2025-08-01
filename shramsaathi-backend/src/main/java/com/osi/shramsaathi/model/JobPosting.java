// src/main/java/com/osi/shramsaathi/model/JobPosting.java

package com.osi.shramsaathi.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String workType;
    private String district;
    private String contactPerson;
    private String phone;
}
